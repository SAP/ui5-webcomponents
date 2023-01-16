# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "UI5-Web-Components-Playground"
  spec.version       = "1.0.0-rc.9"
  spec.authors       = ["SAP SE"]
  spec.email         = ["openui5@sap.com"]

  spec.summary       = %q{UI5 WebComponents. Enterprise-flavored sugar on top of native APIs!.}
  spec.homepage      = "https://sap.github.io/ui5-webcomponents/"
  spec.license       = "Apache-2.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|bin|_layouts|_includes|lib|Rakefile|_sass|LICENSE|README)}i) }
  spec.executables   << 'just-the-docs'

  spec.add_development_dependency "bundler", "~> 2.3.5"
  spec.add_runtime_dependency "jekyll", ">= 3.8.5"
  spec.add_runtime_dependency "jekyll-seo-tag", ">= 2.0"
  spec.add_runtime_dependency "rake", ">= 12.3.1"
end
