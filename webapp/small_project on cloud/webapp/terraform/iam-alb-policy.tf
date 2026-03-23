resource "aws_iam_policy" "alb_latest" {
  name        = "AWSLoadBalancerControllerIAMPolicyLatest"
  description = "Latest policy for AWS Load Balancer Controller"

  policy = file("${path.module}/iam_policy.json")
}

resource "aws_iam_role_policy_attachment" "alb_attach_latest" {
  role       = module.alb_irsa.iam_role_name
  policy_arn = aws_iam_policy.alb_latest.arn
}