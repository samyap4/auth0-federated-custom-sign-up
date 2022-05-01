import React, { useState, Fragment, useEffect } from 'react'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { Transition, Disclosure, Menu } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'

export default function App() {
  const {user, loginWithRedirect} = useAuth0();
  const [email, setEmail] = useState('tony@upfluent.com');
  const [phone, setPhone] = useState('+14048675309');
  const [first, setFirst] = useState('Tony');
  const [last, setLast] = useState('Fracaro');
  const [isVerified, setIsVerified] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [linked, setLinked] = useState(false);
  
  const handleVerifySubmit = (evt) => {
    evt.preventDefault();
    setIsVerified(true);
    setInProcess(true);
  } 

  const handleCodeSubmit = (evt) => {
    evt.preventDefault();
    setInProcess(false);
  } 

  const handleLinkSubmit = (evt) => {
    evt.preventDefault();
    createUser();
  }

  const createUser = () => {
    fetch(process.env.REACT_APP_API_BASE_URL + 'create-user')
    .then(response => response.json())
    .then(data => fetch(process.env.REACT_APP_API_BASE_URL + 'link-user?id=' + data.user_id)
    .then(data => loginWithRedirect()));
  }

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Home', href: '#', current: true },
  ]

  useEffect(() => {
    if (user?.email === 'sam@amazon.com') {
      setLinked(true);
    }
  }, [user]);
  
  return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  {/* <img
                    className="hidden lg:block h-8 w-auto"
                    src={organization && user ? organization.branding.logo_url : "https://i.ibb.co/SwxJtJw/Screen-Shot-2022-04-18-at-12-02-48-PM-removebg-preview.png"}
                    alt="Workflow"
                  /> */}
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-gray-400 hover:text-white">
                      <span className="sr-only">Open user menu</span>
                      {/* {profileImage ? <img
                        className="h-8 w-8 rounded-full"
                        src={profileImage}
                        alt=""
                      /> :
                      <UserIcon className="h-6 w-6" aria-hidden="true"/>} */}
                      
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    <br></br>
    <br></br>
    <div style={{width:"300px", margin:"0 auto"}}>
      {!user && 
        <button 
          onClick={()=>loginWithRedirect()} 
          style={{display: 'inline-block'}}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Begin Flow
        </button>
      } 
      {user && !isVerified && !inProcess && !linked &&
      <>
        <form onSubmit={handleVerifySubmit}>
          <div class="mb-6">
            <label for="phone" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Phone:</label>
            <input type="phone" onChange={e => setPhone(e.target.value)} id="phone" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+14048675309"/>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </>
      }
      {user && isVerified && inProcess && !linked &&
        <>
          <form onSubmit={handleCodeSubmit}>
            <div class="mb-6">
              <label for="number" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Enter Code:</label>
              <input type="number" id="code" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456"/>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </>
      }
      {user && isVerified && !inProcess && !linked &&
        <>
          <form onSubmit={handleLinkSubmit}>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Email:</label>
            <input type="email" onChange={e => setEmail(e.target.value)} id="email" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} placeholder="name@upfluent.com" />
          </div>
          <br></br>
          <div class="mb-6">
            <label for="phone" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Phone:</label>
            <input type="phone" onChange={e => setPhone(e.target.value)} id="phone" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={phone} placeholder="+14048675309" />
          </div>
          <br></br>
          <div class="mb-6">
            <label for="first" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">First:</label>
            <input type="first" onChange={e => setFirst(e.target.value)} id="phone" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={first} placeholder="John" />
          </div>
        <br></br>
        <div class="mb-6">
            <label for="last" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Last:</label>
            <input type="last" onChange={e => setLast(e.target.value)} id="last" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={last} placeholder="Doe" />
          </div>
          <br></br>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-black-900 dark:text-black-300">Password:</label>
            <input type="password" id="password" class="bg-white-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  
          </form>
        </>
      }
      {user && linked &&
        <div style={{margin: 'auto'}}>
          <div class="relative shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                              First Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Email
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-12 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {user.nickname}
                          </th>
                          <td class="px-6 py-4 dark:text-white whitespace-nowrap font-medium">
                            {user.email}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <br></br>
          <LogoutButton />
        </div>
      }
    </div>
    </>
  )
}