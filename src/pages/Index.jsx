import React, { useState } from "react";
import { Box, Button, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSignOutAlt } from "react-icons/fa";

const Index = () => {
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const toast = useToast();

  const handleAddPrompt = () => {
    if (newPrompt.trim() !== "") {
      setPrompts([...prompts, { text: newPrompt, evals: [] }]);
      setNewPrompt("");
    }
  };

  const handleDeletePrompt = (index) => {
    const updatedPrompts = [...prompts];
    updatedPrompts.splice(index, 1);
    setPrompts(updatedPrompts);
  };

  const handleAddEval = (promptIndex, evaluation) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[promptIndex].evals.push(evaluation);
    setPrompts(updatedPrompts);
  };

  const handleRemoveEval = (promptIndex, evalIndex) => {
    const updatedPrompts = [...prompts];
    updatedPrompts[promptIndex].evals.splice(evalIndex, 1);
    setPrompts(updatedPrompts);
  };

  const handleLogout = () => {
    // Perform logout logic here
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        LLM App
      </Heading>

      <Box mb={4}>
        <Input value={newPrompt} onChange={(e) => setNewPrompt(e.target.value)} placeholder="Enter a new prompt" mr={2} />
        <Button onClick={handleAddPrompt} colorScheme="blue">
          Add Prompt
        </Button>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Prompt</Th>
            <Th>Evals</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {prompts.map((prompt, index) => (
            <Tr key={index}>
              <Td>{prompt.text}</Td>
              <Td>
                {prompt.evals.map((evalItem, evalIndex) => (
                  <Box key={evalIndex} display="flex" alignItems="center">
                    {evalItem}
                    <IconButton icon={<FaTrash />} size="sm" ml={2} onClick={() => handleRemoveEval(index, evalIndex)} />
                  </Box>
                ))}
                <Input
                  placeholder="Add eval"
                  size="sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddEval(index, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </Td>
              <Td>
                <IconButton icon={<FaTrash />} onClick={() => handleDeletePrompt(index)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button leftIcon={<FaSignOutAlt />} onClick={handleLogout} mt={4} colorScheme="red">
        Logout
      </Button>
    </Box>
  );
};

export default Index;
