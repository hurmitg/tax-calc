import React, { useState } from "react";
import invoices from "../data/invoice.json";
import { Input, Button, Text, Flex, useToast } from "@chakra-ui/react";
import InvoiceTable from "./InvoiceTable";

const TableAndInput = () => {
  const [data, setData] = useState(invoices.invoices);
  const [calculated, setCalculated] = useState("0000");
  const toast = useToast();

  const calculateTax = ({ sNo, amount, item_type }) => {
    const tax = {
      0: 5,
      1: 8,
      2: 12,
    };
    if (tax[item_type] !== undefined) {
      let tax_amount = (amount * (tax[item_type] / 100)).toFixed(2);
      setCalculated(tax_amount);
    }
  };

  const handleChange = (e) => {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(e.target.files[0]);

    toast({
      title: "File Uploaded",
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
    e.target.value = null;
  };

  function onReaderLoad(event) {
    let input = JSON.parse(event.target.result);
    if (input.invoices !== undefined) setData(input.invoices);
    else {
      toast({
        title: "Invalid data",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  }
  return (
    <>
      <Flex
        p="20px 40px"
        bgColor="white"
        zIndex="100"
        alignItems="center"
        position="sticky"
        color="black"
        top="10vh"
        justifyContent="space-between"
      >
        <Flex alignItems="center" w="50%">
          <Text fontSize="lg">Upload New Data :</Text>
          <Input
            ml="10px"
            p="5px"
            type="file"
            accept="application/json"
            w="50%"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Flex>
        <Flex alignItems="center">
          <Text>Calculated Tax :</Text>
          <Button isDisabled={calculated == "0000"} ml="10px">
            {calculated}
          </Button>
        </Flex>
      </Flex>
      <InvoiceTable data={data} calculateTax={calculateTax} />
    </>
  );
};

export default TableAndInput;
