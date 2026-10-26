import React, { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

// const AddNewCabin = () => {
//  const [isModelOpen, setIsModelOpen] = useState(false);
//   return (
//     <div>
//        <Button onClick={() => setIsModelOpen((prev) => !prev)}>
//           Show Cabins Form
//         </Button>
//         {isModelOpen && <Modal setIsModelOpen={setIsModelOpen} >
//             <CreateCabinForm setIsModelOpen={setIsModelOpen} />
//         </Modal> }
//     </div>
//   )
// }

// export default AddNewCabin

const AddNewCabin = () => {
  return (
    <div>
      
      <Modal>
        
        <Modal.Open openModalName="cabins">
          
          <Button variation="primary">Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window modalType="cabins">
          
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddNewCabin;
