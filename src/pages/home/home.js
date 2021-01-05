import React from 'react';
import { Button, Comment, Form, List, Modal, Tooltip } from 'antd';
import moment from 'moment';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';

const Home = () => {
  const dispatch = useDispatch();

  //发布新树洞Modal
  let [isPostModalVisible, setPostModalVisible] = useState(false);
  //回复树洞Modal
  let [isReplyModalVisible, setReplyModalVisible] = useState(false);
  let [replyHoleId, setReplyHoleId] = useState();
  let { holeList, loading } = useSelector((state) => state.home);

  holeList = holeList.map((v) => ({
    actions: [
      <span
        onClick={() => {
          setReplyHoleId(v.hole.holeId);
          setReplyModalVisible(true);
        }}
      >
        回复
      </span>,
    ],
    author: v.holeUser.holeUserName,
    content: v.hole.content,
    datetime: (
      <Tooltip title={v.hole.date}>
        <span>{moment(v.hole.date).subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
    children: <div>嵌套</div>,
  }));

  const onReplySubmit = (holeId) => {
    console.log(holeId);
    setReplyModalVisible(false);
  };
  const onReplyCancle = (holeId) => {
    console.log(holeId);
    setReplyModalVisible(false);
  };

  const onPostSubmit = (e) => {
    console.log(e);
    setPostModalVisible(false);
  };
  const onPostCancle = () => {
    setPostModalVisible(false);
  };

  let [form] = useForm();

  return (
    <div>
      <div>
        <Button type="primary" onClick={() => setPostModalVisible(true)}>
          发布一条树洞
        </Button>
      </div>

      <Modal
        title="发布树洞"
        visible={isPostModalVisible}
        footer={null}
        onCancel={onPostCancle}
      >
        <Form form={form} onFinish={(e) => onPostSubmit({ ...e, parentId: 0 })}>
          <Form.Item
            name="content"
            rules={[{ required: true, message: '请填写树洞内容' }]}
          >
            <TextArea placeholder="输入树洞内容" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              发布
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="回复"
        visible={isReplyModalVisible}
        footer={null}
        onCancel={onReplyCancle}
      >
        <Form
          form={form}
          onFinish={(e) => onReplySubmit({ ...e, parentId: replyHoleId })}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: '回复内容不能为空' }]}
          >
            <TextArea placeholder="输入回复内容" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              回复
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <List
        className="comment-list"
        header={`${holeList.length} 条树洞`}
        itemLayout="horizontal"
        dataSource={holeList}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />
    </div>
  );
};
export default Home;
