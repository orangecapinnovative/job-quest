import * as WHATWGfetch from 'isomorphic-fetch';


export default (endpoint?: string, fetch?: (url: RequestInfo, init?: RequestInit) => Promise<IResponse>) => {

  /** Allow fetch dependency inject */
  if (!fetch) {fetch = WHATWGfetch; }
  if (!endpoint) {
    endpoint = `http://localhost:3000/api/todo/`;
  }

  return ({

    /** toogle todo by id
     * require : Todo id
     * return all todo result
     */
    toggle: async (id: number) => {
      const data = await fetch(endpoint + id + '/toggle', { method: 'PUT' });
      return data.json();
    },

    /** Remove Todo task by id
     *  require : Todo ID 
     *  return : Todo list
     */
    delete: async (id: number) => {
      const data = await fetch(endpoint + id, { method: 'DELETE' });
      return data.json();
    },

    /** 
     * query todo list
     * return : todo list
     */
    query: async () => {
      const data = await fetch(endpoint);
      return data.json();
    },

    add: async (title: string) => {
      const data = await fetch(endpoint,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title}),
        }
      );
      return data.json();
    },
  });
}
;
