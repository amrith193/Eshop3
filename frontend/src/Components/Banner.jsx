import React from "react";

export default function T() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Shop electronics & free delivery and offers 🛒✨
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Discover our latest summer electronics, including mobiles and
              laptops. Designed to protect you from the elements.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://images.unsplash.com/photo-1561558834-3b6b2aa22b6a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1624522008901-55790cc6ea2f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1632923565835-6582b54f2105?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1587613842560-0816bd27a096?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://i2.wp.com/www.smartprix.com/bytes/wp-content/uploads/2020/10/Samsung-Galaxy-S20-FE-Review-4G-India-version.jpg?ssl=1"
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <a
                      
                      className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                    >
                      Shop Collection
                    </a>
                   */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from 'react'
// const callouts = [
//   {
//     name: 'Desk and Office',
//     description: 'Work from home accessories',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
//     imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
//     href: '#',
//   },
//   {
//     name: 'Self-Improvement',
//     description: 'Journals and note-taking',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
//     imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
//     href: '#',
//   },
//   {
//     name: 'Travel',
//     description: 'Daily commute essentials',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
//     imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
//     href: '#',
//   },
// ]

// export default function Banner() {
//   return (
//     <div className="bg-gray-100">
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-3">
//         <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

//         <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
//           {callouts.map((callout) => (
//             <div key={callout.name} className="group relative">
//               <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
//                 <img
//                   src={callout.imageSrc}
//                   alt={callout.imageAlt}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//               <h3 className="mt-6 text-sm text-gray-500">
//                 <a href={callout.href}>
//                   <span className="absolute inset-0" />
//                   {callout.name}
//                 </a>
//               </h3>
//               <p className="text-base font-semibold text-gray-900">{callout.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// )
// }
