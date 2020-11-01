
export class AlertMessage {
  constructor(public type: string, public text: string) { }
  static ERROR = 'ERROR';
  static SUCCESS = 'SUCCESS';
}

