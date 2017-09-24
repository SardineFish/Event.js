# Event.js
Define event for Object

## Usage 
In HTML
```HTML
...
<script src="event.js"></script>
...
```
In javascript
```javascript
var obj = {};
// Define an event for an Object
EventJs.defineEvent(obj, "onSomeEvent");

function foo(args)
{
  // Do something to handle the event
  console.log("foo: "args);
}
function bar(args)
{
  // Do something to handle the event
  console.log("bar: "args);
}

// Add an event handler
obj.onSomeEvent = foo;

// Add more event handlers
obj.onSomeEvent.add(bar);

// Invoke event handlers
obj.onSomeEvent.invoke("An event happened.");
//>  foo: An event happened.
//>  bar: An event happend.

// Remove event handlers
obj.onSomeEvent.remove(foo);
obj.onSomeEvent.remove(bar);

```
