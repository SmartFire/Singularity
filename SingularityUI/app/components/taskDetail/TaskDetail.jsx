import React from 'react';
import { connect } from 'react-redux';
import Utils from '../../utils';

import Breadcrumbs from '../common/Breadcrumbs';
import JSONButton from '../common/JSONButton';
import Section from '../common/Section';
import CollapsableSection from '../common/CollapsableSection';

class TaskDetail extends React.Component {

  renderHeader(t) {
    const taskState = t.taskUpdates ? (
      <div className="col-xs-6 task-state-header">
        <h3>
          <span className={`label label-${Utils.getLabelClassFromTaskState(_.last(t.taskUpdates).taskState)} task-state-header-label`}>
            {Utils.humanizeText(_.last(t.taskUpdates).taskState)} {t.cleanup ? Utils.humanizeText(t.cleanup.cleanupType) : ''}
          </span>
        </h3>
      </div>
    ) : null;

    const removeBtn = t.isStillRunning ? (
      <a className="btn btn-danger">
        {t.cleanup ?
          (t.cleanup.isImmediate ? 'Destroy task' : 'Override cleanup') :
          (t.isCleaning ? 'Destroy task' : 'Kill Task')}
      </a>
    ) : null;

    return (
      <header className='detail-header'>
        <div className="row">
          <div className="col-md-12">
            <Breadcrumbs
              items={[
                {
                  label: "Request",
                  text: t.task.taskId.requestId,
                  link: `${config.appRoot}/request/${t.task.taskId.requestId}`
                },
                {
                  label: "Deploy",
                  text: t.task.taskId.deployId,
                  link: `${config.appRoot}/request/${t.task.taskId.requestId}/deploy/${t.task.taskId.deployId}`
                },
                {
                  label: "Instance",
                  text: t.task.taskId.instanceNo,
                }
              ]}
            />
          </div>
        </div>
        <div className="row">
          {taskState}
          <div className={`col-xs-${taskState ? '6' : '12'} button-container`}>
            <JSONButton object={t} linkClassName="btn btn-default" text="JSON" />
            {removeBtn}
          </div>
        </div>
      </header>
    );
  }

  render() {
    let task = this.props.task[this.props.taskId].data;
    console.log(task);

    return (
      <div>
        {this.renderHeader(task)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    task: state.api.task,
    taskCleanups: state.api.taskCleanups
  };
}

export default connect(mapStateToProps)(TaskDetail);
