import { Input, IconButton, Icon } from "@once-ui-system/core";
import { ReactNode } from "react";

export default function SearchBar({
  currentSearchTerm,
  setCurrentSearchTerm,
  searchResultDescription,
}: {
  currentSearchTerm: string;
  setCurrentSearchTerm: (term: string) => void;
  searchResultDescription: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSearchTerm(e.target.value);
  };

  const validateInput = (input: ReactNode) => {
    if (!input || typeof input !== "string") return null;
    const regex = /^[a-zA-Z0-9\s-]*$/;
    if (!regex.test(input)) {
      return "Only alphanumeric characters, spaces, and hyphens are allowed.";
    } else {
      return null;
    }
  };

  const handleClear = () => {
    setCurrentSearchTerm("");
  };

  return (
    <Input
      id="achievement-search"
      label="Search Achievements"
      validate={validateInput}
      description={searchResultDescription}
      value={currentSearchTerm}
      onChange={handleChange}
      hasPrefix={<Icon name="search" size="xs" />}
      hasSuffix={
        currentSearchTerm.length > 0 ? (
          <IconButton
            variant="ghost"
            icon="close"
            size="s"
            onClick={handleClear}
            aria-label="Clear search"
          />
        ) : null
      }
    />
  );
}
