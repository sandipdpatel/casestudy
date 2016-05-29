# Case Study
##### Building performance test plan for rest services using JMeter
---
### Assumptions
1. Rest services SignUp (POST) and SignIn (GET) has 2 parameters, username and password
2. Using load generation tool JMeter since Selenium can generate limited concurrent threads
3. Using ANT to run testplan, generate _.jtl_ and _html reports_ and various _graphs_
4. Database needs to be cleaned up manually before each run as OpenShift blocks external connection to the database cartridge
5. The machine where testplan is going to be executed must have GIT, ANT and JMeter installed

### Test Plans
1. Load test case for HTTP GET request - _HTTP_GET.jmx_
2. Load test case for HTTP GET request - _HTTP_GET_TIMER.jmx_
3. Load test case for HTTP POST request - _HTTP_POST.jmx_
4. Load test case for Database - _DB_LOAD.jmx_ (could not execute as OpenShift blocks external connection to the database cartridge)

### Approach
1. **API**
  * ` Webserver ` : node.js with express.js
  * ` Database ` : MySQL
  * ` Hosting service ` : OpenShift
  * ` Base URL ` : <http://restful-apiload.rhcloud.com/api>  
  * ` SignUp URL ` : /user
  * ` SignUp Params ` : email and password
  * ` SignUp Method ` : POST
  * ` SignIn URL ` : /login
  * ` SignIn Query Params ` : eml and pwd
  * ` SignIn Method ` : GET


2. **Test**
  * ` Tool `: JMeter
  * ` Dir for testplans dir `: testplans
  * ` Dir for reports `: reports
  
### Test Metrics
  * Considering limited memory for basic OpenShift app and network latency, acceptable response time for API should be between 400 ms to 600 ms

### How to execute testplan
To run testplan, execute following ANT command,

` ant -Djmeter.home="c:/apache-jmeter-3.0/" -Dtest="HTTP_GET" `

The ant command will run testplan HTTP_GET.jmx, prepare html report from .jtl file and generate graphs like _ResponseTimesOverTime_, _ThreadsStateOverTime_ and _TimesVsThreads_
