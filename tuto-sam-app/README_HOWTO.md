```shell

cd ~/environment/sam-app
sam build

cd ~/environment/sam-app
sam deploy --guided
```

- https://catalog.workshops.aws/complete-aws-sam/en-US/module-4-cicd
- https://catalog.workshops.aws/complete-aws-sam/en-US/module-4-cicd/module-4-cicd-gh/20-credhelper

        1 - Environment variables (not available)
        2 - default (named profile)
        q - Quit and configure AWS credentials
Select a credential source to associate with this stage: 2
Associated account 869935101515 with configuration dev.



Below is the summary of the answers:
1 - Account: 869935101515
2 - Stage configuration name: dev
3 - Region: us-east-1
4 - OIDC identity provider URL: https://token.actions.githubusercontent.com
5 - OIDC client ID: sts.amazonaws.com
6 - GitHub organization: olga.klimkin@gmail.com
7 - GitHub repository: lambdax
8 - Deployment branch:  2025-08-aws-sam
9 - Pipeline execution role: [to be created]
10 - CloudFormation execution role: [to be created]
11 - Artifacts bucket: [to be created]
12 - ECR image repository: [skipped]



```
sam pipeline bootstrap --stage prod

Below is the summary of the answers:
        1 - Account: 869935101515
        2 - Stage configuration name: prod
        3 - Region: us-east-1
        4 - OIDC identity provider URL: https://token.actions.githubusercontent.com
        5 - OIDC client ID: sts.amazonaws.com
        6 - GitHub organization: olga.klimkin@gmail.com
        7 - GitHub repository: lambdax
        8 - Deployment branch:  2025-08-aws-sam
        9 - Pipeline execution role: [to be created]
        10 - CloudFormation execution role: [to be created]
        11 - Artifacts bucket: [to be created]
        12 - ECR image repository: [skipped]

```

```shell

sam pipeline init


```