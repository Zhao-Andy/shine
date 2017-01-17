desc "Run Jasmine-based unit tests of JavaScript"
task :jasmine do
  root_dir = File.expand_path(File.join(File.dirname(__FILE__),"..",".."))
  sh("node_modules/.bin/jasmine-node #{root_dir}/spec/javascripts")
end

task default: :jasmine
