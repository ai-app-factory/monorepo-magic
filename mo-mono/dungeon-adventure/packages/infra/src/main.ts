import { ApplicationStack } from './stacks/application-stack.js';
import {
  App,
  CfnGuardValidator,
  RuleSet,
} from ':dungeon-adventure/common-constructs';

const app = new App({
  policyValidationBeta1: [new CfnGuardValidator(RuleSet.AWS_PROTOTYPING)],
});

// Use this to deploy your own sandbox environment (assumes your CLI credentials)
new ApplicationStack(app, 'dungeon-adventure-infra-sandbox', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  crossRegionReferences: true,
});

app.synth();
