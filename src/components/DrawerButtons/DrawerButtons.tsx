import React from "react";
import { Button, Space } from "antd";

const DrawerButtons: React.FC<{
  onSubmitClick: () => void;
  onCancelClick: () => void;
}> = ({ onSubmitClick, onCancelClick }) => (
  <Space data-testid="drawer-buttons">
    <Button onClick={onCancelClick}>Cancel</Button>
    <Button
      data-testid="drawer-submit"
      onClick={onSubmitClick}
      type="primary"
      htmlType="submit"
    >
      Submit
    </Button>
  </Space>
);

export default DrawerButtons;
