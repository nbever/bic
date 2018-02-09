import bic_fetch from './HttpService';

class IncidentService {

  findIncidents(from, to, states, students) {
    let url = `/api/incidents?from=${from.format('MM/DD/YYYY HH:mm A')}&to=${to.format('MM/DD/YYYY HH:mm A')}&states=${states.join()}`;
    if (students.length > 0) {
      url += `&students=${students.join()}`;
    }

    return bic_fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
  }

}

export default IncidentService;
