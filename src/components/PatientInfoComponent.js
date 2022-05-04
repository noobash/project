import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

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
  const { name, id, age, gender, bloodGroup, weight, diagonosis } = {
    id: 2,
    name: "Amit",
    age: 23,
    gender: "female",
    bloodGroup: "O -ve",
    weight: 56,
  };
  return (
    <Grid
      h="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowSpan={2} colSpan={1} align={"center"} pt={5}>
        <Image
          boxSize="150px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
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
                <Td>Dname</Td>
              </Tr>
              <Tr>
                <Td>Name</Td>
                <Td>{name}</Td>
              </Tr>
              <Tr>
                <Td>Age</Td>
                <Td>{age}</Td>
              </Tr>
              <Tr>
                <Td>Gender</Td>
                <Td>
                  <HStack>
                    {gender}
                    {gender === "female" ? (
                      <BsGenderFemale />
                    ) : (
                      <BsGenderMale />
                    )}
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>BloodGroup</Td>
                <Td>{bloodGroup}</Td>
              </Tr>
              <Tr>
                <Td>Weight</Td>
                <Td>{weight}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </GridItem>
      <GridItem colSpan={4} bg="tomato">
        <HDraw title={"Medical Records"}>
          <List spacing={3}>
            <ListItemDone
              content={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
              }
            />
            <ListItemDoing
              content={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
              }
            />
            <ListItemFailed
              content={
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
              }
            />
          </List>
        </HDraw>
        {/* TODO: Search for a better term than Scans */}
        <HDraw title={"Related Scans"}>
          {/* <li>yards</li>
          <li>metres (m)</li> */}
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
