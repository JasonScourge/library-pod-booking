import React from "react";
import {
  Row,
  Col,
  Drawer,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import dayjs from "dayjs";

import classes from "./NewFormView.module.css";
import validateNric from "../../utils/validateNricFin";

import { range } from "../../utils/arrayUtils";
import rooms from "../../data/rooms.json";

import DrawerButtons from "../DrawerButtons/DrawerButtons";

const NewFormView: React.FC<{
  isFormOpen: boolean;
  onFormExit: () => void;
  form: any;
  onFormSubmit: (data: any) => void;
}> = ({ isFormOpen, onFormExit, form, onFormSubmit }) => {
  const { Option } = Select;
  const podLocations: any = rooms;

  const renderPodLocationOptions = (index: string) => (
    <>
      {index &&
        podLocations[index].map((value: string) => (
          <Option key={value} value={value}>
            {`${value}`}
          </Option>
        ))}
    </>
  );

  return (
    <Drawer
      data-testid="drawer-form"
      open={isFormOpen}
      onClose={onFormExit}
      width={"70%"}
      title={<div className={classes.newTitle}>Book Library Pod</div>}
      extra={
        <DrawerButtons
          onSubmitClick={() => form.submit()}
          onCancelClick={onFormExit}
        />
      }
    >
      <Form
        layout="vertical"
        onFinish={onFormSubmit}
        requiredMark={false}
        form={form}
        initialValues={{
          time: dayjs("13:00", "hh:mm"),
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter a name.",
                },
              ]}
            >
              <Input placeholder="Enter your name here."></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="nric"
              label="NRIC/FIN"
              rules={[
                {
                  required: true,
                  message: "Please enter your NRIC/FIN.",
                },
                {
                  validator: async (_, value) => {
                    if (value) {
                      return validateNric(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Please enter a valid NRIC/FIN.")
                          );
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input placeholder="Enter your NRIC/FIN here."></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="podNumber"
              label="Pod Number"
              rules={[
                {
                  required: true,
                  message: "Please select a Pod Number.",
                },
              ]}
            >
              <Select
                onChange={() => form.setFieldsValue({ podLocation: undefined })}
                placeholder="Select a Pod Number"
              >
                {range(1, 8).map((value) => (
                  <Option key={value} value={value}>
                    {`Pod ${value}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="podLocation"
              label="Pod Location"
              rules={[
                {
                  required: true,
                  message: "Please select a Pod Location.",
                },
              ]}
            >
              <Select
                disabled={!Form.useWatch("podNumber", form)}
                placeholder="Select a Pod Location"
              >
                {renderPodLocationOptions(Form.useWatch("podNumber", form))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Date of Booking"
              name="date"
              getValueFromEvent={(onChange) => dayjs(onChange)}
              getValueProps={(i) => ({
                value: i ? dayjs(i) : i,
              })}
              rules={[
                {
                  required: true,
                  message: "Please select a valid date.",
                },
              ]}
            >
              <DatePicker
                data-testid="form-date-picker"
                format="DD MMM YYYY"
                className={classes.datePicker}
                disabledDate={(current) =>
                  current && current < dayjs().endOf("day")
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Timing of Booking"
              name="time"
              getValueFromEvent={(onChange) => dayjs(onChange)}
              getValueProps={(i) => ({
                value: i ? dayjs(i) : i,
              })}
              rules={[
                {
                  required: true,
                  message: "Please select a valid time slot.",
                },
              ]}
            >
              <TimePicker
                data-testid="form-time-picker"
                showNow={false}
                format="h:mm a"
                minuteStep={30}
                className={classes.timePicker}
                popupClassName={classes.timePickerPopup}
                disabledTime={() => ({
                  disabledHours: () => range(0, 11).concat(range(18, 24)),
                })}
                inputReadOnly
                use12Hours
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="duration"
              label="Duration of Booking"
              rules={[
                {
                  required: true,
                  message: "Please select a duration.",
                },
              ]}
            >
              <Select placeholder="Select a duration">
                <Option value={"30 mins"}>30 Mins</Option>
                <Option value={"1 Hour"}>1 Hour</Option>
                <Option value={"1.5 Hours"}>1.5 Hours</Option>
                <Option value={"2 Hours"}>2 Hours</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default NewFormView;
