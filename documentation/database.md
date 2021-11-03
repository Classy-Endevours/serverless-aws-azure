```
//// -- Tables and References

// Creating tables
Table reports as r {
  id int [pk, increment] // auto-increment
  description varchar
  attachmentURL varchar
  email varchar
  createdAt timestamp
  updatedAt timestamp
}

Enum statusEnum {
  new
  inProgress
  done
  rejected
}

Table statusHistory as s {
  id int [pk, increment] // auto-increment
  reportId int
  status statusEnum
  comments varchar
  createdAt timestamp
  updatedAt timestamp
 }

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
Ref: r.id < s.reportId
```