import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
const InvoiceTable = ({ data, calculateTax }) => {
  return (
    <TableContainer m="20px auto" w="70vw">
      <Table variant="striped" colorScheme="blue">
        <Thead border="1px solid white">
          <Tr bgColor="black" fontSize="xl">
            <Th fontSize="lg" color="white">
              S. No.
            </Th>
            <Th fontSize="lg" color="white">
              Amount
            </Th>
            <Th fontSize="lg" color="white">
              Item Type
            </Th>
            <Th fontSize="lg" color="white"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => {
            return (
              <Tr key={item.sno}>
                <Td>{item.sno}</Td>
                <Td>{item.amount}</Td>
                <Td>{item.item_type}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      calculateTax(item);
                    }}
                    variant="ghost"
                  >
                    Calculate
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
