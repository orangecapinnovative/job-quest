import * as WHATWGfetch from 'isomorphic-fetch';


export default (endpoint?:string, fetch?: (url: RequestInfo, init?: RequestInit) => Promise<IResponse>) => {
  if (!fetch) fetch = WHATWGfetch;
  if (!endpoint) endpoint = `http://localhost:3000/api/todo/`
  return ({
    
    /** toogle todo by id
     * require : Todo id
     * return all todo result */
    toogle: async (id: number) => {
      await fetch(endpoint + id + '/toggle', { method: 'POST' });
      const data = await (await fetch('http://localhost:3001')).json();
      return data;
    },

    /** Remove Todo task by id
     *  require : Todo ID 
     *  return : Todo list
     */
    delete: (id: number) => {

    },

    /** 
     * query todo list
     * return : todo list
     */
    query: async () => {
      const data = await fetch(endpoint);
      return data;
    },

    add: (title: string) => {
      
    }
  })
}