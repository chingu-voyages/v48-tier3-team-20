import Image from "next/image"

export default function Profile() {

  const person = {
    name: 'Jyotirmoy Das',
    role: 'Guwahati, India',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
  }   
    

  return (
    <>
      <div className="flex w-full">

        {/* Left panel starts here */}
        <div className="w-[25%]">

          <div className="bg-white">
              <ul role="list">                
                  <li>
                    <div className="flex flex-col items-center">                      
                      <Image 
                        className="h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40 rounded-full" 
                        src={person.imageUrl} 
                        alt=""
                        width={150}
                        height={150}
                      />
                      <div className="text-sm">
                        <h3 className="font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                        <p className="font-semibold leading-5 text-indigo-600">{person.role}</p>
                      </div>
                    </div>
                  </li>                
              </ul>
          </div>
        </div>
        {/* Left panel ends here */}

        {/* Right panel starts here */}
        <div className="w-[75%]">
          <div>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Profile Information</h3>
              {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p> */}
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{person.name}</dd>
                </div>
                
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">jdx@gmail.com</dd>
                </div>
                
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Bio</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                    qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
                    pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">Interests</dt>
                  <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">Sports</span>
                            <span className="flex-shrink-0 text-gray-400">Outdoor</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Check events
                          </a>
                        </div>
                      </li>
                      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">                    
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">Music</span>
                            <span className="flex-shrink-0 text-gray-400">Live concerts</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Check events
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        {/* Right panel ends here */}

      </div>
    </>
  )  
}
