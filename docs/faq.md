## FAQ

### How to solve warning "Failed to resolve component" ?

NODE_ENV must be set to production.

```
// package.json
{
  "scripts": {
    "start": "NODE_ENV=production node ./app.js"
  }
}
```
