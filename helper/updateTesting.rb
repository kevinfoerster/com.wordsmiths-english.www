require 'fssm'
require 'fileutils'
require 'eventmachine'
require 'em-websocket'

client  = 'com.wordsmiths.www'
dropbox = "/Users/kevin/Dropbox/Public/"+client

FileUtils.rm_r("#{dropbox}")
FileUtils.cp_r("../output/", "#{dropbox}/")

@sockets = []
FSSM.monitor('../output/', '**/*') do
  update { |b, r| 
    puts "Update in #{b} to #{r}" 
    FileUtils.copy("#{b}/#{r}", "#{dropbox}/")
  }
  delete { 
    |b, r| puts "Delete in #{b} to #{r}" 
    FileUtils.remove("#{dropbox}/#{r}")
  }
  create { 
    |b, r| puts "Create in #{b} to #{r}"
    FileUtils.copy("#{b}/#{r}", "#{dropbox}/")
  }
end
