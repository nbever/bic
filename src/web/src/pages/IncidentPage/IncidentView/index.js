import { BaseElement, registerElement } from 'single-malt';

import SlideInput from '../../../components/SlideInput';
import SlideDropDown from '../../../components/SlideDropDown';
import Option from '../../../components/SlideDropDown/Option';
import SlideCalendar from '../../../components/SlideCalendar';
import SlideTimePicker from '../../../components/SlideTimePicker';
import SlideTextArea from '../../../components/SlideTextArea';
import DisciplineBox from './DisciplineBox';
import moment from 'moment';

class IncidentView extends BaseElement {

  get template() {
    const t = `
      <style>
        .parent {
          padding: 24px;
        }

        .flex {
          display: flex;
        }

        a {
          margin-bottom: 12px;
          display: flex;
        }

        slide-input {
          display: flex;
        }

        .shady {
          background-color: #fafafa;
        }

        .paragraph {
          padding: 8px;
        }

        .paragraph>span {
          margin-top: 8px;
          margin-bottom: 8px;
        }
      </style>
      <div class="parent">
        <a href="/incident">&lt; Incident Search</a>

        <div class="shady paragraph">
          <span>Who and when</span>
          <div class="flex">
            <slide-drop-down
              id="student"
              placeholder="Student"
              accent-color=${this.StyleService.accentColor}
              text-color=${this.StyleService.textColor}
              width="250px">
            </slide-drop-down>
            <div class="flex">
              <slide-calendar
                id="occurred-date"
                accent-color=${this.StyleService.accentColor}
                text-color=${this.StyleService.textColor}
                placeholder="on">
              </slide-calendar>
              <slide-time-picker
                id="occurred-time"
                placeholder="at"
                accent-color=${this.StyleService.accentColor}
                text-color=${this.StyleService.textColor}
              >
              </slide-time-picker>
              <slide-drop-down
                id="teacher"
                placeholder="Entered by"
                accent-color=${this.StyleService.accentColor}
                text-color=${this.StyleService.textColor}
                width="250px">
              </slide-drop-down>
            </div>
          </div>
        </div>

        <div class="paragraph">
          <span>What</span>
          <slide-input
            id="title"
            placeholder="Title"
            accent-color=${this.StyleService.accentColor}
            text-color=${this.StyleService.textColor}
          >
          </slide-input>
          <slide-text-area
            id="description"
            placeholder="Description"
            accent-color=${this.StyleService.accentColor}
            text-color=${this.StyleService.textColor}
            width="100%"
          >
          </slide-text-area>
        </div>

        <div class="paragraph shady">
          <span>Discipline</span>
          <div id="discipline-box"></div>
        </div>

      </div>
    `;

    return t;
  }

  connectedCallback() {
    super.connectedCallback();

    const uriTokens = window.location.pathname.split('/');
    const uuid = uriTokens[uriTokens.length-1];

    this.IncidentService.getIncident(uuid).then(this.showForm);
    this.fillStudentField();
    this.fillTeacherField();
  }

  fillStudentField() {
    const studentDropDown = this.find('#student');
    studentDropDown.mode = SlideDropDown.AUTO_COMPLETE;
    this.UserService.users.then( (users) => {
      const students = users.filter( (user) => user.role.value === 'STUDENT' );
      studentDropDown.options = students.map( (student) => new Option(student._id, this.UserService.formatUserName(student)));
    });
  }

  fillTeacherField() {
    const teacherDropdown = this.find('#teacher');
    teacherDropdown.mode = SlideDropDown.AUTO_COMPLETE;
    this.UserService.users.then( (users) => {
      const teachers = users.filter( (user) => user.role.value !== 'STUDENT' );
      teacherDropdown.options = teachers.map( (teacher) => new Option(teacher._id, this.UserService.formatUserName(teacher)));
    });
  }

  showForm = (response) => {
    response.json().then( (incident) => {

      this.UserService.getUser(incident.studentString).then( (student) => {
        this.find('#student').setSelectedKey(student._id);
      });

      this.UserService.getUser(incident.creatorString).then( (teacher) => {
        this.find('#teacher').setSelectedKey(teacher._id);
      });

      const createTime = new moment(incident.creationTime * 1000);
      this.find('#occurred-date').selectedDay = createTime;
      this.find('#occurred-time').time = createTime;
      this.find('#title').value = incident.title;
      this.find('#description').value = incident.description;

      incident.disciplineAssignments.forEach( this.addDiscipline );
    });
  }

  addDiscipline = (discipline) => {
    const dBox = new DisciplineBox();
    dBox.discipline = discipline;
    this.find('#discipline-box').appendChild(dBox);
  }
}

export default registerElement('IncidentService', 'UserService', 'StyleService')(IncidentView);
