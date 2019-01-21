export class Account {
  constructor(_id, _number, _owners, _balance, _type) {
    this.id = _id;
    this.account_number = _number;
    this.owner = _owners;
    this.balance = _balance;
    this.type = _type;
  }
}
