import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { IoDuplicateSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import Table from "../../ui/Table.jsx"
import Menus from "../../ui/Menus.jsx"
//   const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

import React from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const CabinRow = ({ cabin }) => {
  const { id, name, maxCapacity, regularPrice, discount, description, image } =
    cabin;
console.log('cabin data------' , cabin);
  const [showForm, setShowForm] = useState(false);
  const { DeleteCabin, isDeleteing, error } = useDeleteCabin();
  const { createNewCabin, isLoading } = useCreateCabin();
  function duplicate() {
    createNewCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} alt="cabin-img" />
        <Cabin>{name} </Cabin>
        <div>Fits Up tp {maxCapacity} Gustes </div>
        <Price>{formatCurrency(regularPrice)} </Price>
        <Discount>{formatCurrency(discount)} </Discount>
        <div>
         
          <Modal> 
            <Menus>
              
             <Menus.Menu>
         <Menus.Toggle id={id} />
         <Menus.List id={id}>
          <Menus.Button icon={  <IoDuplicateSharp />} onClick={duplicate}>Dupliacte</Menus.Button>
           <Modal.Open openModalName="edit">
          
                <Menus.Button  icon={   <CiEdit />} >Edit</Menus.Button>
          </Modal.Open>
          <Modal.Open openModalName="delete">
          <Menus.Button  icon={ <MdDeleteForever />} >Delete</Menus.Button>
          </Modal.Open>
         </Menus.List>
          
          <Modal.Window modalType="edit">
             <CreateCabinForm editCabin={cabin} />
          </Modal.Window>
        
          {/*  */}
          
           
          <Modal.Window modalType="delete">
            <ConfirmDelete  resourceName={name} onConfirm={() => DeleteCabin(id)} disabled={isDeleteing}  />
          </Modal.Window>
           
        </Menus.Menu>
    </Menus>
          </Modal>
          {/*  */}
        </div>
      
      </Table.Row>
     
    </>
  );
};

export default CabinRow;
