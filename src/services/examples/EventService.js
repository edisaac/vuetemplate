import mockupClient from '@/services/examples/clients/mockupClient.js'

export default {
  getEvents(perPage, page) {
    return mockupClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return mockupClient.get('/events/' + id)
  },
  postEvent(event) {
    return mockupClient.post('/events', event)
  },
}
