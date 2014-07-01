uptime-freemobileNotif
======================

This Uptime (https://github.com/fzaninotto/uptime) plugin notifies all events (up, down, paused, restarted) 
by sending a HTTP POST request to the Freemobile SMS API URL.
The request will only work for users of the french mobile operator : freemobile

To use the plugin, first install it cloning this repository and copying index.js in plugins/freemobileNotif 

Then to enable it, add it to the `config/production.yaml` configuration file, as in the example below:

```yaml
plugins:
  - ./plugins/freemobileNotif

  freemobileNotif:
    user:   <identifiants freemobile>
    pass:   <Api password>
```
