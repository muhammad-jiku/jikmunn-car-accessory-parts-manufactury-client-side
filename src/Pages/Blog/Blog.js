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
          Using Immutable Data Structures 2. Function/Stateless Components and
          React.PureComponent 3.Dependency optimization 4. Avoid Inline Function
          Definition in the Render Function.
        </h1>
      </div>
      <br />
      <br />

      <div>
        <h1 className="text-orange-700 text-2xl">
          What are the different ways to manage a state in a React application?
        </h1>
        <h1 className="text-xl">
          Communication State 2. Data State 3. Control State 4. Session State 5.
          Location State
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
          hidden property known as Prototype. The Prototypal Inheritance is a
          feature in javascript used to add methods and properties in objects.
          It is a method by which an object can inherit the properties and
          methods of another object. Traditionally, in order to get and set the
          Prototype of an object, we use Object.getPrototypeOf and
          Object.setPrototypeOf. Nowadays, in modern language, it is being set
          using __proto__.
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
          If we update it directly, calling the setState() afterward may just
          replace the update you made. When we directly update the state, it
          does not change this.state immediately. Instead, it creates a pending
          state transition, and accessing it after calling this method will only
          return the present value. we will lose control of the state across all
          components.
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
          Firstly, we import useState from react . Then, we import the Scroll
          and SearchList components. Next, in the Search function, we use the
          useState hook to initialise the value of the searchField state with
          useState("") (an empty string). After this, we use the filter function
          on the details list received from the parent.
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
