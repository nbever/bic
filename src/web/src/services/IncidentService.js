import bic_fetch from './HttpService';

class IncidentService {

  findIncidents(from, to, states, dateTypes) {
    return bic_fetch(
      `/api/incidents?from=${from.format('MM/DD/YYYY HH:mm A')}&to=${to.format('MM/DD/YYYY HH:mm A')}&states=${states.join()}&dateTypes=${dateTypes.join()}`,
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
