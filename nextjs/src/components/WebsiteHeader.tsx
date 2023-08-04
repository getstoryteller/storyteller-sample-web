import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const UserOptions = dynamic(() => import('@/components/UserOptions'), {
  ssr: false,
});

export default function WebsiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header>
      <nav
        className="mx-auto flex container items-center justify-between pl-3 pt-6 pb-3 max-w-[1400px]"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Storyteller demo</span>
            <Image
              className="logo-light-mode"
              src="/storyteller-logo.svg"
              alt="Storyteller Logo"
              width={200}
              height={40}
              style={{
                width: 'auto',
                height: 'auto',
              }}
              priority={true}
            />
            <Image
              className="logo-dark-mode"
              src="/storyteller-logo-light.svg"
              alt="Storyteller Logo"
              width={200}
              height={40}
              style={{
                width: 'auto',
                height: 'auto',
              }}
              priority={true}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <UserOptions />
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Storyteller</span>
              <Image
                src="storyteller-logo.svg"
                alt="Storyteller Logo"
                width={200}
                height={40}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <a
                  href="/settings"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <Image
                    src="/avatar.png"
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    alt="User Logo"
                    width={40}
                    height={40}
                  />
                </a>
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center rounded-md border border-indigo-600 text-indigo-600 px-8 py-1 text-base font-medium hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
