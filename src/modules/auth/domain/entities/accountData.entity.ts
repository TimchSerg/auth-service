import {
  Email,
  Phone,
  Id
} from "../values"
import { 
  AccountId, 
  AccountName, 
  AccountSurname,
  AccountPatronymic  
} from '../values'

export class AccountData {

  private _id: Id
  private _accountId: AccountId
  private _name: AccountName
  private _surname: AccountSurname
  private _patronymic: AccountPatronymic
  private _birthday: Date
  private _email: Email
  private _phone: Phone
  private _createdAt: Date

  constructor(
    id: Id,
    accountId: AccountId,
    name: AccountName,
    surname: AccountSurname,
    patronymic: AccountPatronymic,
    birthday: Date,
    email: Email,
    phone: Phone,
    createdAt: Date
  ) {
    this._id = id
    this._accountId = accountId
    this._name = name
    this._surname = surname
    this._patronymic = patronymic
    this._birthday = birthday
    this._email = email
    this._phone = phone
    this._createdAt = createdAt
  }

  get id(): Id {
    return this._id
  }

  get accountId(): AccountId {
    return this._accountId
  }

  get name(): AccountName {
    return this._name
  }

  set name(name: AccountName) {
    this._name = name;
  }

  get surname(): AccountSurname {
    return this._surname
  }

  set surname(surname: AccountSurname) {
    this._surname = surname;
  }

  get patronymic(): AccountPatronymic {
    return this._patronymic
  }

  set patronymic(patronymic: AccountPatronymic) {
    this._patronymic = patronymic;
  }

  get birthday(): Date {
    return this._birthday
  }

  set birthday(birthday: Date) {
    this._birthday = birthday;
  }

  get email(): Email {
    return this._email
  }

  set email(email: Email) {
    this._email = email;
  }

  get phone(): Phone {
    return this._phone
  }

  get createdAt(): Date {
    return this._createdAt
  }

  

  equals(accountData: AccountData): boolean {
    return this.id.equals(accountData.id)
  }
}
