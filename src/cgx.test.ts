import 'mocha';
import 'reflect-metadata';

import {CGX} from './cgx';
import { expect } from 'chai';  
import { assert, createStubInstance, SinonStub, SinonStubbedInstance, stub, SinonSpy } from 'sinon';

import { Logger } from './utils/logger';
import { Contributing, License } from './options/universal';
import { CodeOfConduct, BugReport, FeatureRequest, PullRequestTemplate } from './options/github';
import { Bug, CITemplate, FeatureProposal, MergeRequestTemplate } from './options/gitlab';
import { UniversalChoiceValue, GithubChoiceValue, GitlabChoiceValue, Answer, ProviderValue, LicenseValue } from './models/choice';
import { providerQuestion, githubFileQuestion, gitlabFileQuestion } from './questions';
import { Container } from 'inversify';

describe('CGX', () => {
    let cgx: CGX;

    let logger: SinonStubbedInstance<Logger>;
    let contributing: SinonStubbedInstance<Contributing>;
    let license: SinonStubbedInstance<License>;
    let codeOfConduct: SinonStubbedInstance<CodeOfConduct>;
    let bugReport: SinonStubbedInstance<BugReport>;
    let featureRequest: SinonStubbedInstance<FeatureRequest>;
    let pullRequestTemplate: SinonStubbedInstance<PullRequestTemplate>;
    let bug: SinonStubbedInstance<Bug>;
    let ciTemplate: SinonStubbedInstance<CITemplate>;
    let featureProposal: SinonStubbedInstance<FeatureProposal>;
    let mergeRequestTemplate: SinonStubbedInstance<MergeRequestTemplate>;
  
    let executeCGX: SinonStub;
    let generateFile: SinonStub;
    let providerQuestion: SinonSpy;

    const answer: Answer = {
        files: UniversalChoiceValue.CONTRIBUTING,
        confirm: true,
        userName: 'jeroenouw',
        licenses: LicenseValue.MIT,
        provider: ProviderValue.GITHUB
    }

    beforeEach(() => {
        const container = new Container();

        logger = createStubInstance(Logger);
        contributing = createStubInstance(Contributing);
        license = createStubInstance(License);
        contributing = createStubInstance(Contributing);
        codeOfConduct = createStubInstance(CodeOfConduct);
        bugReport = createStubInstance(BugReport);
        featureRequest = createStubInstance(FeatureRequest);
        pullRequestTemplate = createStubInstance(PullRequestTemplate);
        bug = createStubInstance(Bug);
        ciTemplate = createStubInstance(CITemplate);
        featureProposal = createStubInstance(FeatureProposal);
        mergeRequestTemplate = createStubInstance(MergeRequestTemplate);
        
        container.bind('Logger').toConstantValue(logger);
        container.bind('Contributing').toConstantValue(contributing);
        container.bind('License').toConstantValue(license);
        container.bind('CodeOfConduct').toConstantValue(codeOfConduct);
        container.bind('BugReport').toConstantValue(bugReport);
        container.bind('FeatureRequest').toConstantValue(featureRequest);
        container.bind('PullRequestTemplate').toConstantValue(pullRequestTemplate);
        container.bind('Bug').toConstantValue(bug);
        container.bind('CITemplate').toConstantValue(ciTemplate);
        container.bind('FeatureProposal').toConstantValue(featureProposal);
        container.bind('MergeRequestTemplate').toConstantValue(mergeRequestTemplate);
        container.bind('CGX').to(CGX);

        cgx = container.get('CGX');
          
        executeCGX = stub(cgx, 'executeCGX' as any);
        generateFile = stub(contributing, "generateFile" as any);
    });

    describe('executeCGX', () => {
        beforeEach(()=> {
            // executeCGX.callThrough();
        });

        it('generates a file', async () => {
            // executeCGX.resolves(moveRepoResponse);
            // providerQuestion.resolves(answer);
            executeCGX.resolves();

            await cgx.executeCGX();
            assert.calledOnce(executeCGX);
            assert.calledOnce(providerQuestion);
            // assert.calledWith(providerQuestion, 'test');
        });
        // it('catches an error when something goes wrong', async () => {
        //     moveRepoQuestions.rejects('failed');
        //     moveRepoActions.resolves();

        //     await moveRepo.moveRepo();
            
        //     assert.notCalled(moveRepoActions);
        // });
    });


});
