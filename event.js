window.EventJs = (function ()
{
    function Event()
    {
        this.def = null;
        this.handlers = ArrayList();
    }
    Event.prototype.invoke = function (args)
    {
        if (!args["handled"])
            args.handled = false;
        if (this.def)
            this.def(args);
        for (var i = 0; i < this.handlers.length; i++)
        {
            if (args.handled)
                return;
            if (this.handlers[i])
                this.handlers[i](args);
        }
    }
    Event.prototype.add = function (handler)
    {

        this.handlers.add(handler);
    }
    Event.prototype.remove = function (handler)
    {
        if (this.def == handler)
            this.def = null;
        this.handlers.remove(handler);
    }

    function EventManager()
    {
        this.events = {};
        this.eventNames = ArrayList();
    }
    EventManager.prototype.register = function (name, event)
    {
        if (name == undefined || name == null)
            throw new Error("A name of the event required.");
        if (this.eventNames.indexOf(name) > 0)
            throw new Error("Event existed.");
        this.events[name] = event;
        this.eventNames.add(name);
    }
    Event.EventManager = EventManager;

    function defineEvent(obj, name, handler)
    {
        if (!obj)
            throw new Error("An object required.");
        if (name == undefined || name == null)
            throw new Error("A name of the event required.");
        if (!obj.eventManager)
        {
            obj.eventManager = new EventManager();

        }

        if (obj.eventManager.eventNames.contain(name))
            throw new Error("Event existed.");
        var event = new Event();
        obj.eventManager.register(name);
        Object.defineProperty(obj, name, {
            get: function ()
            {
                return event;
            },
            set: function (handler)
            {
                event.def = handler;
            }
        })
    }
    Event.defineEvent = defineEvent;
    return Event;
})();
