import React from "react"
import styled from "styled-components"

interface FootnoteModalProps {
  isOpen: boolean
  onClose: () => void
  content: string
}

const FootnoteModal: React.FC<FootnoteModalProps> = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null

  return (
    <Overlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Content>{content}</Content>
      </ModalContent>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: var(--color-gray-2);
  padding: 20px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`

const Content = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--color-text);
`

export default FootnoteModal 