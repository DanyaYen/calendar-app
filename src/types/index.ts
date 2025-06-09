export interface ITask {
  id: string;      
  text: string;    
}


export interface IHoliday {
  date: string;     
  localName: string; 
  name: string;      
  countryCode: string; 
}

export type TasksStructure = Record<string, ITask[]>;