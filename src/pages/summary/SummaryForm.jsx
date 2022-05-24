import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const SummaryForm = () => {
  const [termsChecked, setTermsChecked] = useState(false)

  const popover = (
    <Popover id='termsandconditions-popover'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )
  
  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check  
          type="checkbox"
          checked={termsChecked}
          onChange={(e) => setTermsChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!termsChecked}>
        Confirm Order
      </Button>
    </Form>
  )
}

export default SummaryForm