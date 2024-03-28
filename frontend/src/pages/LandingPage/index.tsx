import React from "react";
export const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <section
        className="cover bg-orange-600 bg-gradient-to-r from-indigo-500 relative bg-blue-600 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex
      items-center min-h-screen"
      >
        <div className="h-full absolute top-0 left-0 z-0">
          {/* <img
            src=""
            alt=""
            className="w-full h-full object-cover opacity-20"
          /> */}
        </div>

        <div className="lg:w-3/4 xl:w-2/4 relative z-10 h-100 lg:mt-16">
          <div>
            <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              A better life starts with a beautiful smile.
            </h1>
            <p className="text-blue-100 text-xl md:text-2xl leading-snug mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              repellat voluptatum exercitationem ratione dolore rem aliquam
              neque ab voluptas reiciendis eos unde velit illo nulla hic error
              saepe, recusandae alias.
            </p>
            <a
              href="#"
              className="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold"
            >
              Do Something
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
