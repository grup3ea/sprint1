# sprint1

###estructura:

```
var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email:   { type: String },
    description:   { type: String },
    publications: [{
      title: { type: String },
      date: { type: Date },
      content: { type: String }
    }]
})
```
