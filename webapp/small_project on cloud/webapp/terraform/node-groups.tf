module "node_groups" {
  source  = "terraform-aws-modules/eks/aws//modules/eks-managed-node-group"
  version = "20.0.0"

  for_each = {
    app = {
      instance_type = "c7i-flex.large"
    }
    data = {
      instance_type = "c7i-flex.large"
    }
    monitoring = {
      instance_type = "c7i-flex.large"
    }
  }

  cluster_name = module.eks.cluster_name
  name         = each.key

  subnet_ids = module.vpc.private_subnets

  instance_types = [each.value.instance_type]

  min_size     = 1
  max_size     = 2
  desired_size = 1

  labels = {
    role = each.key
  }
}