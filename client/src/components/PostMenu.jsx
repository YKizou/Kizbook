import React from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu, Transition } from "@headlessui/react";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";



const PostMenu = ({ post }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete("/api/posts/" + post._id, {
        headers: {"Access-Control-Allow-Origin": "*"},
        data: user,
      });
      window.location.reload() 
    } catch (err) {}
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button>
                <MoreVert className="scale-125" />
              </Menu.Button>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <Menu.Item>
                    <div className="px-4 py-3">
                      <p className="text-sm leading-5 cursor-pointer" onClick={()=>handleDelete()}>Delete</p>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default PostMenu;
