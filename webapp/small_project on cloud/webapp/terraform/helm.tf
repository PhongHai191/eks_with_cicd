resource "helm_release" "alb_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"

  namespace = "kube-system"

  depends_on = [module.eks]

 values = [<<EOF
clusterName: ${module.eks.cluster_name}
region: ap-southeast-2
vpcId: ${module.vpc.vpc_id}

serviceAccount:
  create: false 
  name: aws-load-balancer-controller
EOF
]
}
resource "helm_release" "monitoring" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"

  namespace        = "monitoring"
  create_namespace = true

  depends_on = [module.eks]

  values = [<<EOF
grafana:
  service:
    type: ClusterIP

prometheus:
  prometheusSpec:
    retention: 2d
EOF
  ]
  timeout = 900
}