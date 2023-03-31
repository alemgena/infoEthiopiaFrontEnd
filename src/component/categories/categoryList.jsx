import React, { useState, useEffect } from "react";
import { url } from "../URL/url";
// import Dropdown from "react-multilevel-dropdown";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Typography } from "@mui/material";

function CategoryList(props) {
  const history = useHistory();
  const [catagories, setCatagories] = useState([]);
  useEffect(() => {
    axios.get(`${url}api/view-main-catagories`).then((response) => {
      setCatagories(response.data.result);
    });
  }, [props]);
  const Menus = () => {
    return (
      <Menu>
        <Dropdown text="Categories" pointing className="link item">
          <Dropdown.Menu>
            <Dropdown.Header>Main Categories</Dropdown.Header>
            {catagories.map((catagory, index) => {
              return (
                <Dropdown.Item>
                  {catagory.children.length > 0 ? (
                    <Dropdown text={catagory.name}>
                      <Dropdown.Menu>
                        {catagory.children.map((children, index) => {
                          return <Dropdown.Item>{children.name}</Dropdown.Item>;
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    catagory.name
                  )}
                </Dropdown.Item>
              );
            })}
            {/* <Dropdown.Item>
              <Dropdown text="Clothing">
                <Dropdown.Menu>
                  <Dropdown.Header>Mens</Dropdown.Header>
                  <Dropdown.Item>Shirts</Dropdown.Item>
                  <Dropdown.Item>Pants</Dropdown.Item>
                  <Dropdown.Item>Jeans</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Womens</Dropdown.Header>
                  <Dropdown.Item>Dresses</Dropdown.Item>
                  <Dropdown.Item>Shoes</Dropdown.Item>
                  <Dropdown.Item>Bags</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>

      // <Dropdown
      //   title={
      //     <div className="navMenuDropdown">
      //       Catagories <ArrowForwardIosIcon fontSize="inherit" />
      //     </div>
      //   }
      // >
      //   {catagories.map((catagory, index) => {
      //     return (
      //       <Dropdown.Item
      //         buttonVariant="primary"
      //         key={index}
      //         position="right"
      //         onClick={() =>
      //           catagory.children.length > 0
      //             ? null
      //             : history.push({
      //                 pathname: `/companies/${catagory.name}`,
      //                 state: { item: catagory },
      //               })
      //         }
      //       >
      //         <Typography>{catagory.name}</Typography>
      //         {catagory.children.length > 0 && (
      //           <Dropdown.Submenu position="right" className="listWidth">
      //             {catagory.children.map((children, index) => {
      //               return (
      //                 <Dropdown.Item
      //                   buttonVariant="secondary"
      //                   key={index}
      //                   onClick={() =>
      //                     children.children.length > 0
      //                       ? null
      //                       : history.push({
      //                           pathname: `/companies/${children.name}`,
      //                           state: { item: children },
      //                         })
      //                   }
      //                 >
      //                   <Typography>{children.name}</Typography>
      //                   {children.children.length > 0 && (
      //                     <Dropdown.Submenu
      //                       position="right"
      //                       className="listWidth"
      //                       buttonVariant="primary"
      //                     >
      //                       {children.children.map((child, index) => {
      //                         return (
      //                           <Dropdown.Item
      //                             key={index}
      //                             onClick={() =>
      //                               history.push({
      //                                 pathname: `/companies/${child.name}`,
      //                                 state: { item: child },
      //                               })
      //                             }
      //                           >
      //                             <Typography>{child.name}</Typography>
      //                           </Dropdown.Item>
      //                         );
      //                       })}
      //                     </Dropdown.Submenu>
      //                   )}
      //                 </Dropdown.Item>
      //               );
      //             })}
      //           </Dropdown.Submenu>
      //         )}
      //       </Dropdown.Item>
      //     );
      //   })}
      // </Dropdown>
    );
  };
  return <Menus />;
}

export default CategoryList;
