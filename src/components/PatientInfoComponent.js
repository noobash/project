import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import PeopleList from "./people.json";

import {
  List,
  ListIcon,
  ListItem,
  Button,
  Collapse,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";

import {
  Center,
  Grid,
  GridItem,
  Image,
  Table,
  TableContainer,
  TableCaption,
  Th,
  Tr,
  Thead,
  Td,
  Tbody,
  Tfoot,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ListItemDoing = ({ content }) => {
  return (
    <ListItem>
      <ListIcon as={AiOutlineClockCircle} color="blue.500" />
      {content}
    </ListItem>
  );
};

const ListItemDone = ({ content }) => {
  return (
    <ListItem>
      <ListIcon as={AiOutlineCheckCircle} color="green.500" />
      {content}
    </ListItem>
  );
};

const ListItemFailed = ({ content }) => {
  return (
    <ListItem>
      <ListIcon as={AiOutlineCloseCircle} color="red.500" />
      {content}
    </ListItem>
  );
};

function HDraw({ title, children }) {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <div>
      <Button colorScheme="blue" {...getButtonProps()}>
        {title}
      </Button>
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 500 : 0 }}
        style={{
          background: "#E2E8F0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "absolute",
          right: "0",
          height: "100vh",
          top: "0",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const PatientInfo = (props) => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(null);
  const patientID = window.location.toString().split("/").slice(-1);

  useEffect(() => {
    setLoading(true);
    const thisGuy = PeopleList.filter((user) => {
      return user.id === patientID[0];
    });
    thisGuy.length > 0 && setPatient(thisGuy[0]);
    setLoading(false);
  });

  return loading ? (
    "Loading user data"
  ) : (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} align={"center"} pt={5}>
        <Image
          boxSize="150px"
          // src="https://thispersondoesnotexist.com/image"
          src={patient.img}
          alt="NAme"
        />
      </GridItem>
      <GridItem colSpan={2}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption placement={"top"}>
              {/* default patient information */}
            </TableCaption>
            <Thead>
              <Tr>
                <Th>StatName</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>DoctorAssigned</Td>
                <Td>{patient.doctorName}</Td>
              </Tr>
              <Tr>
                <Td>Name</Td>
                <Td>{patient.name}</Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td>{patient.age}</Td>
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>
                  <HStack>
                    {patient.gender}
                    {patient.gender === "female" ? (
                      <BsGenderFemale />
                    ) : (
                      <BsGenderMale />
                    )}
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>BloodGroup</Td>
                <Td>{patient.bloodGroup}</Td>
              </Tr>
              <Tr>
                <Td>Weight</Td>
                <Td>{patient.weight}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
      <GridItem colSpan={4} bg="tomato">
        <HDraw title={"Medical Records"}>
          <List spacing={3}>
            <ListItemDone content={patient.history} />
            <ListItemDoing content={"example 1"} />
            <ListItemFailed content={"example 2"} />
          </List>
        </HDraw>
        <HDraw title={"Related Scans"}>
          <Image src={patient?.problem?.image} />
        </HDraw>
      </GridItem>
    </Grid>
  );
};
/*
ImageProps = {
    caption, keywords, patientID
}
*/

export default PatientInfo;
