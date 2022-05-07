import React from 'react';

const Blogs = () => {
  return (
    <div className="w-11/12 max-w-[600px] pt-32 mx-auto flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-medium text-center pb-8">Blog</h1>
      <div className="flex flex-col gap-4 border border-gray-700">
        <h1 className="text-2xl border-b border-gray-700 p-6">
          Difference between javascript and node.js
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            Javascript is an interpreted, lightweight, just-in-time compiled
            language with first class functions whereas node.js is an
            asynchronous event-driven runtime library of javascript.
          </p>
          <p>
            Javascript is client-sided whereas node.js was developed for using
            javascript on the server side
          </p>
          <p>
            Javascript runs on chrome's V8 engine and an upgraded version of
            ECMAscript whereas node.js written in C, C++, and Javascript and
            uses the V8 engine.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-gray-700">
        <h1 className="text-2xl border-b border-gray-700 p-6">
          When to use node.js and when to use MongoDB?
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            Node.js is mainly used for event-driven, non-blocking, and I/O
            intensive servers. It was designed for real-time, push based
            architectures. Since it is single threaded, it is used for backend
            API servers, and traditional web sites. We should use node.js for
            server side development.
          </p>
          <p>
            MongoDB is a NoSQL database and popular as OLTP database. MongoDB
            can perform transactions efficiently. When we need to store data and
            use it in our website, mongodb is a good option. we can perform CRUD
            operations.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border border-gray-700">
        <h1 className="text-2xl border-b border-gray-700 p-6">
          Differences between SQL and NoSQL databases.
        </h1>
        <div className="flex flex-col gap-4 px-6 pb-4">
          <p>
            SQL databases are relational databases whereas NoSQL are
            non-relational databases.
          </p>
          <p>
            SQL databases are structured. Related data is stored in tables also
            known as relations. The data is stored in row format and the column
            contains the attributes. The rows are called tuples. NoSQL databases
            are not structured. They are stored in JSON like object. Different
            NoSQL databases use different objects but they all pretty much work
            like JSON. For examle, MongoDB uses BSON both internally and over
            the network.
          </p>
        </div>

        <div className="flex flex-col gap-4 border border-gray-700">
          <h1 className="text-2xl border-b border-gray-700 p-6">
            What is the purpose of jwt and how does it work?
          </h1>
          <div className="flex flex-col gap-4 px-6 pb-4">
            <p>
              JWT or JSON web token is used to share information between two
              parties in a compact and self-contained way. This is a open
              standard. The information is passed as JSON. JWT is a signed
              document and can only be verified with the secret that it was
              signed with. This does not concern with data hiding. In fact, no
              sensitive information should be kept in its object. But it ensures
              data integrity. That means, if the token has been tempered, it can
              be detected with the secret. A JWT has three parts, a header that
              consists of the type of token and the signing algorithm. The
              second part is the payload containing the actual data. Finally,
              the third part is the signature, which can be created with the
              encoded header, payload and the secret. The most common use is to
              authorize user. Whenever a user logs in, next requests made by the
              user will include the JWT. This can be used as authenticator as
              well. Because the token is signed, if any third party tries to
              change it, that tempering can be detected.
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
