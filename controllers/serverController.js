// @name: helloWorld
// @path: GET /
// @desc: display the 'hello world' message
const helloWorld = (req, res, next) => {
   res.send('Hello World!');
};

// @name: greetPeople
// @path: GET /
// @desc: welcome people to the Uber-clone-backend-server
const greetPeople = (req, res, next) => {
   // res.status(200).json({message: "Welcome to the Uber's backend server (cloned)"})
   res.send(`<div style="">
      <h1 style="text-align: center; margin-top: 20px" >Welcome to the Uber backend server (cloned)</h1>
      <ul>
         <h2>Avaiable API end points:</h2>
         <ul>
            <li>
               <h3 style="margin-bottom: 3" >User API (Private)</h3>
               <ul>
                  <li>
                     POST<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /users/register</span></a> : Register a new user
                  </li>
                  <li>
                     POST<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /users/login</span></a> : Login an existing user
                  </li>
                  <li>
                     GET<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /users/profile</span></a> : Return a loggedin user's profile
                  </li>
                  <li>
                     GET<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /users/logout</span></a> : Return a loggedin user's profile
                  </li>
               </ul>
            </li>

            <li>
               <h3 style="margin-bottom: 3px" >Captain API (Private)</h3>
               <ul>
                  <li>
                     POST<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /captains/register</span></a> : Register a new captain
                  </li>
                  <li>
                     POST<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /captains/login</span></a> : Login an existing captain
                  </li>
                  <li>
                     GET<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /captains/profile</span></a> : Return a loggedin captain's profile
                  </li>
                  <li>
                     GET<a href='https://github.com/omarbinsaleh/uber-clone-backend' target='_blank' ><span> /captains/logout</span></a> : Return a loggedin captain's profile
                  </li>
               </ul>
            </li>
         </ul>
      </ul>
      </div>`)
};

// exports the server controllers
module.exports = { helloWorld, greetPeople };