package com.hubspot.singularity.resources;

import static com.hubspot.singularity.WebExceptions.checkForbidden;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;

import org.apache.mesos.Protos.TaskID;
import org.apache.mesos.Protos.TaskState;
import org.apache.mesos.Protos.TaskStatus;

import com.google.common.base.Optional;
import com.google.inject.Inject;
import com.hubspot.singularity.SingularityAbort;
import com.hubspot.singularity.SingularityAbort.AbortReason;
import com.hubspot.singularity.SingularityLeaderController;
import com.hubspot.singularity.SingularityService;
import com.hubspot.singularity.config.SingularityConfiguration;
import com.hubspot.singularity.mesos.SingularityDriver;
import com.hubspot.singularity.scheduler.SingularityTaskReconciliation;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;

@Path(TestResource.PATH)
@Api(description="Misc testing endpoints.", value=TestResource.PATH)
public class TestResource {
  public static final String PATH = SingularityService.API_BASE_PATH + "/test";

  private final SingularityAbort abort;
  private final SingularityLeaderController managed;
  private final SingularityConfiguration configuration;
  private final SingularityDriver driver;
  private final SingularityTaskReconciliation taskReconciliation;

  @Inject
  public TestResource(SingularityConfiguration configuration, SingularityLeaderController managed, SingularityAbort abort, final SingularityDriver driver, SingularityTaskReconciliation taskReconciliation) {
    this.configuration = configuration;
    this.managed = managed;
    this.abort = abort;
    this.driver = driver;
    this.taskReconciliation = taskReconciliation;
  }

  @POST
  @Path("/scheduler/statusUpdate/{taskId}/{taskState}")
  @ApiOperation("Force an update for a specific task.")
  public void statusUpdate(@PathParam("taskId") String taskId, @PathParam("taskState") String taskState) {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    driver.getScheduler().statusUpdate(null, TaskStatus.newBuilder()
        .setTaskId(TaskID.newBuilder().setValue(taskId))
        .setState(TaskState.valueOf(taskState))
        .build());
  }

  @POST
  @Path("/leader")
  @ApiOperation("Make this instance of Singularity believe it's elected leader.")
  public void setLeader() {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    managed.isLeader();
  }

  @POST
  @Path("/notleader")
  @ApiOperation("Make this instanceo of Singularity believe it's lost leadership.")
  public void setNotLeader() {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    managed.notLeader();
  }

  @POST
  @Path("/stop")
  @ApiOperation("Stop the Mesos scheduler driver.")
  public void stop() throws Exception {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    managed.stop();
  }

  @POST
  @Path("/abort")
  @ApiOperation("Abort the Mesos scheduler driver.")
  public void abort() {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    abort.abort(AbortReason.TEST_ABORT, Optional.<Throwable>absent());
  }

  @POST
  @Path("/start")
  @ApiOperation("Start the Mesos scheduler driver.")
  public void start() throws Exception {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");

    managed.start();
  }

  @POST
  @Path("/exception")
  @ApiOperation("Trigger an exception.")
  public void throwException(@QueryParam("message") @DefaultValue("test exception") String message) {
    throw new RuntimeException(message);
  }

  @POST
  @Path("/reconcile")
  @ApiOperation("Start task reconciliation")
  public void startTaskReconciliation() throws Exception {
    checkForbidden(configuration.isAllowTestResourceCalls(), "Test resource calls are disabled (set isAllowTestResourceCalls to true in configuration)");
    taskReconciliation.startReconciliation();
  }
}
