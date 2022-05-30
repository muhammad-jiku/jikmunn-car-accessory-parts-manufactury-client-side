import React from 'react';

const Blog = () => {
  return (
    <div className="container mx-auto text-justify my-6">
      <h1 className="text-3xl text-center lg:text-left underline mb-6">
        Some important question to answer
      </h1>
      <div>
        <h1 className="text-orange-700 text-2xl">
          How will you improve the performance of a React Application?
        </h1>
        <h1 className="text-xl">
          There are some of the way to improve the performance of REACT App.
          Some of them are like Keeping component state local where
          necessary,prevent unnecessary re-renders by memorizing REACT
          Component, Code-splitting, Windowing or list virtualization in
          Applications,by using dependency optimization, by avoiding inline
          function definition in the Render Function & by using immutable Data
          Structures. To successfully optimize React application, must need to
          first find a performance problem in our application to rectify.
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          What are the different ways to manage a state in a React application?
        </h1>
        <h1 className="text-xl">
          There are four main types of state you need to properly manage in your
          React app.<strong> Local state</strong> is managed in React using the
          useState hook. It is data developer manage in one or another
          component.
          <strong> Global state</strong> is necessary when user need to get and
          update data anywhere in the app, or in multiple components at least.
          <strong> Server state</strong> data that comes from an external server
          that must be integrated with UI state.
          <strong> URL state</strong> data that exists in URLs, including the
          pathname and query parameters. React application rely upon accessing
          URL state. There are several pieces of state that must be managed
          every time when fetch or update data from an external server,
          including loading and error state.
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          How does prototypical inheritance work?
        </h1>
        <h1 className="text-xl">
          Every object with its methods and properties contains an internal and
          hidden property is called Prototype. The Prototypal Inheritance is a
          feature in javascript used to add methods and properties in objects.
          It is a method by which an object can inherit the properties and
          methods of another object. In order to get and set the [[Prototype]]
          of an object, developer or user or programmer use
          Object.getPrototypeOf and Object.setPrototypeOf or using __proto__.
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          Why you do not set the state directly in React. For example, if you
          have const [products, setProducts] = useState([]). Why you do not set
          products = [...] instead, you use the setProducts
        </h1>
        <h1 className="text-xl">
          State should never update directly due to the some reasons such as If
          state update directly, calling the setState() afterward may just
          replace the update is made. When state update directly, it does not
          change this.state immediately. Instead, it creates a pending state
          transition, and accessing it after calling this method will only
          return the present value. And React itself will lose control of the
          state across all components.
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h1>
        <h1 className="text-xl">
          First import useState from React at the top of App component. Search
          bar functionality calls for setting a state variable that changes
          based on the input value of the bar. Then, declare the state variable
          "searchQuery" whose initial value is an empty string. And declare a
          state variable "filteredName" for the name element want to return and
          render on the DOM based on search. Then from products array the name
          field will be iterating over based on the searchQuery, and rendered it
          . Define a callback function and pass it down as a prop The purpose of
          the function "handleSearch" is to retrieve a value from our search
          component and set the state variable "searchQuery" to the input value
          of the search bar. And then implemented logic within this function
          that maps over every string element in the "products" array, inquires
          if that element includes the value set in our search bar, and then
          sets our state variable "filteredName" to that element, a single name,
          which will be returned in red as seen in the example above. Pass the
          callback function down to the child Search component as a prop. After
          doing so, the input value within the Search Component can be assigned
          to "searchQuery." Set an "onChange" event handler on the input field
          Within the child Search Component, set an "onChange" event handler on
          the input field (the search bar, itself). The purpose of the
          "onChange" event in react is detecting when a change is made in an
          input field. And Then, (Console.log(e.target.value) to see the
          characters logged as when type them within the search bar!).
          Event.target.value is transferred up to the App component's
          "handleSearch" function and passed as an argument into the function —
          the parameter "newSearchQuery".
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          What is a unit test? Why should write unit tests?
        </h1>
        <h1 className="text-xl">
          UNIT TESTING is a type of software testing where individual units or
          components of a software are tested. The purpose is to validate that
          each unit of the software code performs as expected. Unit Testing is
          done during the development of an application by the developers. Unit
          Tests isolate a section of code and verify its correctness. A unit may
          be an individual function, method, procedure, module, or object. Unit
          testing allows software developers to actually think through the
          design of the software and what has to be done before they write the
          code. This can help them to stay focused and can also help them to
          create much better designs.
        </h1>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Blog;
