import React from 'react'
import BaseLayout from "../../layouts/BaseLayout";
import { Outlet } from 'react-router-dom';

function FieldsLayout() {
  return (
    <BaseLayout>
      <div className="w-full">
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-600">
          <div className="absolute inset-0 bg-gradient-to-br from-main to-main-hover  opacity-30" />

          <div className="relative w-full h-[90%] mt-auto flex justify-center">
            <div className="bg-gradient-to-br from-secondary-hover to-main-hover  w-[90%] rounded-lg mb-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default FieldsLayout;
