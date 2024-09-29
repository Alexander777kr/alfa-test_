import { Container, Flex } from '@chakra-ui/react';
import { LoadingAndErrorLayoutProps } from './LoadingAndErrorLayoutTypes';

export default function LoadingAndErrorLayout({
  children,
}: LoadingAndErrorLayoutProps) {
  return (
    <Flex minWidth="1000px" minH="100vh" alignItems="center">
      <Container>{children}</Container>
    </Flex>
  );
}
