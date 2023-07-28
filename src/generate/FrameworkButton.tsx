import { Button } from "@chakra-ui/react";

interface FrameworkButtonProps {
  framework: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const FrameworkButton: React.FC<FrameworkButtonProps> = ({
  framework,
  isSelected,
  onSelect,
}) => (
  <Button
    onClick={onSelect}
    colorScheme={isSelected ? "purple" : "gray"}
  >
    {framework}
  </Button>
);
